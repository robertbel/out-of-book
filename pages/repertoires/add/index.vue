<template>
  <div class="page-title">
    <h1>Add new repertoire</h1>
  </div>
  <div>
    <label for="repertoire-name">Repertoire name:</label>
    <input type="text" name="repertoire-name" id="repertoire-name" />
  </div>
  <div>
    <p>What color is this repertoire for:</p>
    <input type="radio" id="white" name="repertoire-color" value="w" />  
    <label for="white">White</label><br />
    <input type="radio" id="black" name="repertoire-color" value="b" />  
    <label for="black">Black</label><br />
  </div>
  <button>Create!</button>
</template>
