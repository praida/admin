module.exports = exports = {
  testCredentials: (action) => {
    const url = 'http://localhost:3333/versions'
    return () => {
      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return fetch(url, params)
        .then((res) => {
          if (200 === res.status) {
            return res.json();
          }
          throw res;
        });
    };
  }
}