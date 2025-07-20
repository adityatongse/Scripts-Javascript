(async () => {
  // Your playlist/favorites slug
  const favoriteSlug = "";

  // Your full problem list as given
  const problemNames = [
    "Two Sum [Solution]",
    "Valid Parentheses [Solution]",
  ];

  // Helper: Convert problem name to slug (like 'two-sum')
  function toSlug(name) {
    return name
      .toLowerCase()
      .replace(/\[.*?\]/g, '')  // remove anything in square brackets
      .trim()
      .replace(/[^a-z0-9 ]+/g, '')  // remove special chars except space
      .replace(/\s+/g, '-')   // replace spaces with hyphens
  }

  // Get CSRF token from cookies
  function getCsrfToken() {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let c of ca) {
      while(c.charAt(0) === ' ') c = c.substring(1);
      if(c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  }

  const query = `
    mutation addQuestionToFavoriteV2($favoriteSlug: String!, $questionSlug: String!) {
      addQuestionToFavoriteV2(
        favoriteSlug: $favoriteSlug
        questionSlug: $questionSlug
      ) {
        ok
        error
      }
    }
  `;

  const csrfToken = getCsrfToken();

  for (let i = 0; i < problemNames.length; i++) {
    const problemName = problemNames[i];
    const questionSlug = toSlug(problemName);

    try {
      const response = await fetch('https://leetcode.com/graphql/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-csrftoken': csrfToken,
        },
        body: JSON.stringify({
          operationName: "addQuestionToFavoriteV2",
          query,
          variables: {
            favoriteSlug,
            questionSlug
          }
        }),
      });
      const data = await response.json();

      if (data.data?.addQuestionToFavoriteV2?.ok) {
        console.log(`[${i + 1}/${problemNames.length}] Added: ${problemName} (${questionSlug})`);
      } else if (data.errors?.some(e => e.message.includes('🐸☕question already in list')) || data.data?.addQuestionToFavoriteV2?.error?.includes('question already in list')) {
        console.log(`[${i + 1}/${problemNames.length}] Skipped (already in list): ${problemName} (${questionSlug})`);
      } else {
        console.warn(`[${i + 1}/${problemNames.length}] Failed to add: ${problemName} (${questionSlug})`, data);
      }

      // Small delay to avoid rate limiting
      await new Promise(res => setTimeout(res, 500));
    } catch (e) {
      console.error(`[${i + 1}/${problemNames.length}] Error adding: ${problemName}`, e);
    }
  }

  console.log('Done adding all problems!');
})();
