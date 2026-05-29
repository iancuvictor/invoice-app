
# Project built in React.JS (first project in React)
###  [Live link to the project](https://iancu-invoice-generator.vercel.app/)
<img width="1900" height="867" alt="Screenshot 2026-05-30 012528" src="https://github.com/user-attachments/assets/1e598884-eee3-42b0-a699-5fc552f842e5" />
Video Preview: (https://github.com/user-attachments/assets/ed2f4d20-dae0-4df3-afb4-7aea67dc819e)

This project is meant to demonstrate the use (and understanding) of:
- useState/useEffect
- component usage
- passing data between components (to components and FROM components)
- general development logic
- UX logic

### I created this project because, at my girlfriend's job, they still do invoices by hand.

The layout of the page is very basic, as it is not meant to necessarily be pretty, but useful. Also, the tool is meant to be used only on desktop, hence the lack of mobile responsiveness or overall responsiveness.
The invoice follows the basic Romanian invoice body and all of the data is saved locally thru localStorage. 
You can do the following:
- save/create new invoices
- edit already existing invoices
- print the invoices
- search the invoices in the invoice LIST

### Known issues:
- dataFactura is stored as a single-element array — should be refactored to a plain object, too tedious to do now, will know for future projects.
- input fields could've been a component, too late to change now, have to move on.
