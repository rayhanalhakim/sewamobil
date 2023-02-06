const express = require("express")
const app = express()
const multer = require("multer")//buat upload file
const path = require("path")// untuk memanggil path direktori
const fs = require("fs") // untuk manajemen file
const mysql = require("mysql")
const cors = require("cors")

// implementasi
app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// variabel untuk konfigurasi proses upload file

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        // generate file name 
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage })

// mysql connection atau menyambungkan database

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penyewaan_mobil"
})

// endpoint untuk menambah data penyewaan mobil

app.post("/mobil", upload.single("image"), (req, res) => {
    // prepare data
    let data = {
        id_mobil: req.body.id_mobil,
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
        image: req.file.filename
    }})