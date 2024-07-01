# Budgeting App - Frontend

#### Front-end feature requirements

To complete the front-end application, you will need to build a React application that allows for CRUD operations to be performed on a single resource. You will also need to display the data thoughtfully and clearly.

1. All pages include the same navigation bar, which includes the name of the application and a button to create a new resource.
2. It has an Index page that presents all of the resources in the database table.
3. After clicking on a single resource, you are brought to a Show page which includes more detailed information about the specific resource.
4. When the button in the navigation bar to create a new resource is clicked, you are brought to a new page that includes a form to create a new resource.
5. Forms are properly labeled and the `type` of inputs should be properly set. For example, an input that requires a `number` should have type `number`, not `text`.
6. When a new resource form is submitted, the resource is created in the database and the user is brought to that new resource's Show page.
7. On the resource's Show page, there is a button to edit the current resource. When clicked, the user is brought to a form page with data already filled in that can be edited.
8. When an edited resource form is submitted, the resource is edited in the database and the user is brought to that new resource's Show page.
9. On the resource's Show page, there is a button to delete the current show page.
10. Using the resource's data, a calculation is performed on the front-end application and displayed to the user on the Index page. For example, the bank account total is visible. In addition to the total, the CSS changes based on the value - a greenish color if the bank account total is above 100, a yellowish color if the bank account total is between 0 and 100 and reddish color if the bank account total is less than 0. 

### Stretch goals

- Make `categories` a `select` HTML element on the new/edit forms to allow the user to choose from a pull-down menu from the available categories, and allow for the addition of new categories to the options menu.
- Display the bank account total in the nav bar (or similar component that is visible on all views), instead of just on the index page.
- Add helpful errors to users when they try to create or edit items with invalid data
- Use the date object for the date, instead of just a string. Be sure to format it on the front-end to make it human-readable. Try using the `date` input type as well.
- Use a checkbox, separate input or similar strategy to allow the user to select whether the transaction is a deposit or withdrawal. If it is a withdrawal, make sure the value subtracts and deposit values add. By default, your user would have be entering values that are positive or negative.
- Create a fake user login, similar to the example given in the official[ React Router GitHub Repository](https://github.com/remix-run/react-router/tree/dev/examples/auth), and allow viewing/updating resources by a user.
