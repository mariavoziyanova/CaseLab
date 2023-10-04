function censor() {
    const pairs = [];
  
    function censorFunc(str1, str2) {
      if (str1 && str2) {
        pairs.push([str1, str2]);
      } else if (str1) {
        for (const pair of pairs) {
          // console.log(pair)
          const regex = new RegExp(pair[0], 'g');
          str1 = str1.replace(regex, pair[1]);
          // console.log(str1)
        }
        return str1;
      }
    }
  
    return censorFunc;
  }
  
  const changeScene = censor();
  changeScene('PHP','JS');
  changeScene('backend', 'frontend')
  console.log(changeScene('PHP is the most popular programming language for backend web-development'));
  