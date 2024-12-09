<style>
    /* Optional: Style for the popup */
    #popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        background-color: #fff;
        border: 3px solid #ccc;
        box-shadow: 3px 5px 10px rgba(0, 0, 0.5, 0.3);
        z-index: 1000;
    }
</style>

<div id="popup">
<p><b>Общо Събрание на Членовете на клуба!!!</b><br /><b><u>Дата: 28.12.2024 г. (Събота)</u></b>
    <br /><b><u>Място: хотел Кипарис Алфа - Конферентна зала</u></b><br />
<i>За повече информация и записване, <br />свържете се с ръководството!</i></p>
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiskPhakRiytki6c3FJHnlzTeGdxINPxSSAmSwPnjxHVPsiI3hyphenhyphenqwH9qaSjli7SrW5w599-7HvIEZ6SpE30-ahZ4S_jNDcgj11Ok_v2pwMVpfMcfyIl2aq6wZLjEEHciMnec0UzHJbKmpyI7jy9BOA5Fc3AUqv_qSmvR2lGbagaSF1HELAoBSAi9JpNjdC5/s7016/%D0%9F%D0%9E%D0%9A%D0%90%D0%9D%D0%90-%D0%9E%D0%A1-2024_001.png" width="400" height="500" />

   <button id="close" onclick="closePopup()">Затвори!</button></div>


<script>
// Function to show the popup
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Event listener for the window onload event
window.onload = function () {
    // Show the popup when the page loads
    showPopup();
};
</script>
