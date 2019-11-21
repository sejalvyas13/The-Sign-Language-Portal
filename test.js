// // Json schema validator
// const djv = require('djv');
// const env = djv();

// const jsonSchema = {
//     "common": {
//         "properties": {
//           "type": {
//             "enum": ["common"]
//           }
//         },
//         "required": [
//           "type"
//         ]
//       }
// };

// // Add json-schema
// env.addSchema('postAnimal', jsonSchema);

// var f =  env.validate('postAnimal', { "name":""});

// updateProperties = {
//     "newType": "Giraffe"
// }
// const { newName, newType } = updateProperties;

// console.log(newName);
// console.log(newType);

const animalsData = require('./data/animals');
const postsData = require('./data/posts');

// async function main() {
//   var update = await animals.updatePosts("5dacfe93573c0618dca8a4ad", "5dad00c71ffebc2888966222", false);
//   console.log(update);
// }

async function main2() {
  try {
    const animalsList = await animalsData.getAll();
    const modifiedAnimalsList = []

    for (const animal of animalsList) {
      let likes = []
      let posts = []

      for (const likeId of animal.likes) {
        const post = await postsData.getPostById(likeId);
        likes.push({
          "_id": likeId,
          "title": post.title
        });
      }

      for (const postId of animal.posts) {
        const post = await postsData.getPostById(postId);
        posts.push({
          "_id": postId,
          "title": post.title
        });
      }

      modifiedAnimalsList.push({
        _id: animal._id,
        name: animal.name,
        animalType: animal.animalType,
        likes: likes,
        posts: posts
      })
    }

    res.json(modifiedAnimalsList);
  } catch (e) {
    console.log({ error: e });
  }
}

main2().catch(e => {
  console.log(e);
});
