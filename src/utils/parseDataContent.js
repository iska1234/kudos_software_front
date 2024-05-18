export const parseDataContent = (dataContent) => {
    try {
      const cleanedDataContent = dataContent
        .replace(/\\/g, "")
        .replace(/"/g, "");
  
      const jsonArray = cleanedDataContent.split('},').map(item => item + '}');
      const cleanedJsonArray = jsonArray.map(item => {
        const obj = {};
        const pairs = item.slice(1, -1).split(','); 
        pairs.forEach(pair => {
          const [key, value] = pair.split(':').map(str => str.trim());
          obj[key.replace(/["{}]/g, '')] = value.replace(/["{}]/g, ''); 
        });
        return obj;
      });

      return cleanedJsonArray;
    } catch (e) {
      console.error("Error parsing data content:", e);
      return [];
    }
  };