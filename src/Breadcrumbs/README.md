# Breadcrumbs component

## Item Properties
| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number| - | + | Specifies the item id |
| link | string | - | - | Optional link to be called on click |
| value | string or node | - | + | Value to be shown on breadcrumb |
| disabled | boolean | false | - | True if this value is disabled |
| customElement | element | - | - | A custom item which will be rendered |

## Breadcrumbs Path Factory
```javascript
  /**
  * path: The path of the breadcrumbs - aaa/bbb/ccc will result 3 items of value aaa, bbb, ccc and link of '/aaa', '/aaa/bbb/', '/aaa/bbb/ccc'
  * baseUrlLink: Make the links relative to the new baseUrlLink instead of the current url
  * baseUrlVale: When given, the baseUrlLink will become the first option of the breadcrumbs
  * pathSeparator: allow to pass path with custom separator (i.e. 'aaa-bbb-ccc')
  */
  breadcrumbsPathFactory(path, baseUrlLink = '', baseUrlValue = null, pathSeparator = '/')
```
