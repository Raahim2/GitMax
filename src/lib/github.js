export async function getFile(owner, repo, accessToken) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/helloworld.txt`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
          },
        }
      );
  
      if (!response.ok) {
        if (response.status === 404) {
          return { exists: false };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return { exists: true, content: data.content, sha: data.sha };
    } catch (error) {
      throw error;
    }
  }
  
  export async function updateFile(owner, repo, accessToken, content, sha) {
    const currentDate = new Date().toISOString().split('T')[0];
    let newContent;
  
    if (sha) {
      const currentContent = atob(content);
      newContent = `${currentContent}\nHello World - ${currentDate}`;
    } else {
      newContent = 'Hello World';
    }
  
    const contentEncoded = btoa(newContent);
  
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/helloworld.txt`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Daily Hello World update',
          content: contentEncoded,
          sha: sha,
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response;
  }
  