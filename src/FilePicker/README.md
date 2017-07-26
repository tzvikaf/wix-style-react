# FilePicker component

> FilePicker

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| mainLabel | string | Choose File | - | Some text that will appear as a main label besides the Icon |
| subLabel | string | No file chosen (Max size 5 MB)| - | Some text that will appear as a sub label besides the Icon |
| header | string | - | - | Some text that will appear above the Icon |
| onChange | func | - | - | Callback function for when a file is uploaded |
| supportedFormats | string | Unlimited group of formats | - | supported formats seperated by comma (.png, .pdf) |
| maxSize | number | 5MB | - | Max size of file allowed |
| error | bool | false | - | should present error |
| errorMessage | string | '' | - | error message to present |
| id | string or number | random unique id | - | id for the filePicker |

