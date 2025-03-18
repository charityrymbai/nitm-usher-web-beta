const { collegeData } = require("../data/collegeData");

export function searchProfessors(query) {
  const results = [];

  const data = collegeData;

  for (const block in data) {
    for (const floor in data[block]) {
      for (const office in data[block][floor].offices) {
        const officeData = data[block][floor].offices[office];
        const professorName = officeData.name.replace("'s office", "");
        const nameParts = professorName.toLowerCase().split(" ");
        if (nameParts.some(part => part.startsWith(query.toLowerCase()))) {
          results.push({
            id: officeData.id, 
            name: professorName,
            office: office,
            location: `${office} on ${floor} of ${block}`,
          });
        }
        if (results.length === 7) {
          return results;
        }
      }
    }
  }
  return results;
}

export function searchById(id) {
  const data = collegeData;

  for (const block in data) {
    for (const floor in data[block]) {
      for (const office in data[block][floor].offices) {
        const officeData = data[block][floor].offices[office];
        if (officeData.id === id) {
          return {
            id: officeData.id,
            name: officeData.name,
            office: office,
            location: `${office} on ${floor} of ${block}`,
          };
        }
      }
    }
  }
  return null;
}

