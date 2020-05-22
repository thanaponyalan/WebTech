// เรียกใช้งานเมื่อกดปุ่ม hamburger โดยจะทำการเพิ่มหรือลบคลาสให้แสดงผลเป็นไปตามที่กำหนดใน css
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}