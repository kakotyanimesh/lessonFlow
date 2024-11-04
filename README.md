
# LessonFlow 🎓📚

Alongside my coding journey, I am also pursuing a BSc BEd degree. Part of my BEd program involves creating detailed lesson plans as class assignments, which need to follow specific formats like structured tables, mind maps, and extensive text content. To streamline this often tedious task, I created LessonFlow—a tool that leverages the Gemini API to automate lesson plan creation with just a few inputs. With the help of the Officegen npm package, the generated content is converted into a `.docx` format that aligns with my course requirements.

## Features ✨

- **Automated Lesson Plan Generation**: Easily generate structured lesson plans by entering basic details.
- **Customized Prompts**: Tailored prompts for essential sections of a lesson plan, including overviews, activities, assessments, and key questions.
- **Dynamic Download**: Download generated lesson plans as `.docx` files, ready to submit.
- **Simple Interface**: A user-friendly form allows for quick input of fields like subject, topic, grade, and duration.

## Tech Stack 🛠️

- **Frontend**: Built with React, Recoil for state management, and TailwindCSS for styling.
- **Backend**: Node.js, Express, MongoDB for data storage, Officegen for `.docx` file generation, Zod for validation, and Axios for API requests.
- **AI Integration**: Uses the Google Gemini API for generating relevant lesson content.

---

