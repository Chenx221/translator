# translator

## TEST

```javascript
fetch('http://127.0.0.1:3005/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text: "hello world" })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```