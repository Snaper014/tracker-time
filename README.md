# Application de Gestionnaire de Tâches


![Application de Gestionnaire de Tâches](/public/tracker-desktop.png)

## Presentation

Welcome to the task manager app, built with React and Vite! This app lets you manage your tasks efficiently by providing you with a user-friendly interface to add, delete and edit tasks. Here's a quick guide to familiarize yourself with its features.

## Demo

You can access the live demo of the REST Countries API Flag project by clicking the following link: [Application de Gestionnaire de Tâches](https://gestionnaire-taches.vercel.app/)

## installation 

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Snaper014/Gestionnaire-Taches.git

2. Navigate to the project directory:
    ```bash
    cd Gestionnaire-Taches

3. Install the project dependencies using npm:
    ```bash
    npm install
4. Start the development server:
    ```bash
    npm run dev
5. Open your web browser and access the project at http://localhost:3000.

## Main Features

1. Add a Task:

To add a task, click on the "Add Task" button in the header.
Complete the form with the task details:
Task Name
Start Date (optional)
End Date (optional)
Category (choose from available categories)
Click "Add" to add the task.

2. Edit a Task:

To modify an existing task, click on a task to select it then
Edit the task details in the form.
Click "Update" to save the changes.

3. Delete a Task:

Click on a task to select it then click on the “Delete” button.

4. Task List:

The task list is displayed in the body of the application.
It includes the following columns:
Task Name
Start date
End Date (or “Undefined” if not specified)
Status (In Progress or Completed)
Duration
In progress tasks are automatically updated with the current date and time for the "Finish Date".

5. Filter Tasks:

You can use the search input to filter tasks by name. It will instantly display the matching results.

6. Responsive:

The app is designed to be fully responsive, meaning it adapts to different types of devices, from desktops to smartphones.
