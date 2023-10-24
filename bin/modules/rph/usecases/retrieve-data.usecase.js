const retrieveDataFromAPI = ({ axios, authToken, livestockDB }) => {
  return async function fetchLivestock (info) {
    const livestockId = info.id
    try {
      const response = await axios.get('https://api.petfinder.com/v2/animals/' + livestockId, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
      const livestockData = response.data

      const data = await livestockDB.addLivestock({
        id: livestockData.animal.id,
        livestock_name: livestockData.animal.name,
        type: livestockData.animal.type,
        species: livestockData.animal.species,
        age: livestockData.animal.age,
        photo: livestockData.animal.photos,
        created_at: livestockData.animal.published_at,
        updated_at: livestockData.animal.status_changed_at
      })
      return data
    } catch (error) {
      console.error(error)
      return { error: 'Gagal mengambil dan menyimpan data dari API' }
    }
  }
}

module.exports = retrieveDataFromAPI
