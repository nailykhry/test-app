const apiModelEntity = (livestock) => {
    const { id, livestock_name, type, species, age, photo, created_at, updated_at } = livestock
 
    return Object.freeze({
        id, 
        livestock_name, 
        type, 
        species, 
        age, 
        photo, 
        created_at, 
        updated_at
    })
  }
  
  module.exports = apiModelEntity
  