const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  bio: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    duration: {
      type: String,
      required: true,
    },
    authors: {
      type: Array(authorSchema),
      required: true,
    },
  })
);

//---------------------
//      COURSE
//---------------------

async function createCourse(name, duration, authors) {
  const course = new Course({
    name,
    duration,
    authors,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field].message);
    }
  }
}

async function editCourseName(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      name: "Final",
    }
  );
}

async function deleteCourse(courseId) {
  const course = await Course.findOneAndRemove(courseId);
}
async function selectCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// async function addSingleFieldInCourse(courseId) {
//   const course = await Course.aggregate([
//     {
//       $addFields: {
//         "Last-date": "",
//       },
//     },
//   ]);
// }

async function selectCourseById(courseId) {
  const course = await Course.findById(courseId);
  console.log(course);
}

async function deleteSingleFieldFromCourse(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        duration: "",
      },
    }
  );
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function updateAuthor(courseId, authorId) {
  // const course = await Course.findById(courseId);
  // course.author.name = "Mohammadtalha";
  // course.save();
  // const course = await Course.update(
  //   { _id: courseId },
  //   {
  //     $set: {
  //       "author.name": "a",
  //       "author.bio": "www.mohammad.com",
  //       "author.email": "asas@asas.asa",
  //     },
  //   }
  // );
  const course = await Course.findById(courseId);
  let author = course.authors.id(authorId);
  author.name = "mohammad";
  author.email = "mohammad@gmail.com";
  author.bio = "updated bio";
  course.save();
}

async function removeAuthoName(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        "author.name": "",
      },
    }
  );
}

async function removeAuthorById(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

async function selectAllAuthors(courseId) {
  const course = await Course.findById(courseId);
  console.log(course.authors);
}

//--------------------------------
//             COURSE
//--------------------------------

//-----------------------
//    CreateCourse (ADD)
//-----------------------
// createCourse("First Course", "8-months", [
//   new Author({
//     name: "eeeee",
//     email: "          EEEE@GMAIL.COM          ",
//     bio: "here is my bio",
//   }),
//   new Author({
//     name: "fffff",
//     email: "          TTTTT@GMAIL.COM          ",
//     bio: "mohammad's bio is here",
//   }),
// ]);

//-----------------------
//    EditCourse (EDIT)
//-----------------------
// editCourseName("5fbcaf131e64d2736477ef00");

//------------------------------
//    DeleteCourse (DELETE)
//------------------------------
// deleteCourse("5fbcabaf11c3cb6b28b1b35e");

//------------------------------
//    SelectCourse (SELECT)
//------------------------------
// selectCourses();

//------------------------------
//    SelectCourseById (SELECT By Id)
//------------------------------
// selectCourseById("5fbcaf131e64d2736477ef00");

//--------------------------------------
// AddSingleField(Add Single Field)
//--------------------------------------

// addSingleFieldInCourse("5fbcb8f263d68129a486f1e8");

//--------------------------------------------
//    DeleteSingleField (Delete Single Field)
//--------------------------------------------
// deleteSingleFieldFromCourse("5fbcb8f263d68129a486f1e8");

//--------------------------------
//             AUTHOR
//--------------------------------

//------------------------------
//    CreateNewAuthor(ADD)
//------------------------------
// addAuthor(
//   "5fbcb9acd20a7b33f4a9cd67",
//   new Author({
//     name: "wwesse",
//     email: "ww@gmail.com",
//     bio: "ww's bio here ",
//   })
// );

//----------------------------
//    UpdateAuthor(EDIT)
//----------------------------
// updateAuthor("5fbcb9acd20a7b33f4a9cd67", "5fbcb9acd20a7b33f4a9cd65");

//-----------------------
//    Remove Author
//-----------------------
// removeAuthoName("5fbc9a6772044b6e54437e4e");

//-----------------------
//  RemoveAuthorById
//-----------------------
// removeAuthorById("5fbcb9acd20a7b33f4a9cd67", "5fbcc4e3ed0d534a0062b020");

//----------------------------
//    SelectAllAuthors(SELECT)
//----------------------------

selectAllAuthors("5fbcb9acd20a7b33f4a9cd67");
