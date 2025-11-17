# Laporan MUK 2 - CI/CD Pipeline Setup (GitHub Actions + Jenkins)

## 1. Identitas Peserta

- Nama Peserta : _(isi)_
- Skema Sertifikasi : _(isi sesuai skema)_
- Tanggal Uji : _(isi)_

## 2. Deskripsi Singkat Proyek

Saya membuat aplikasi web sederhana menggunakan Node.js yang menampilkan halaman HTML statis. Aplikasi ini digunakan sebagai contoh untuk implementasi pipeline CI/CD dengan GitHub Actions dan Jenkins.

Repository GitHub: _(isi URL repository GitHub Anda)_

## 3. Struktur Proyek

- `src/server.js` : Server HTTP sederhana.
- `src/index.html` : Halaman web utama.
- `scripts/build.js` : Script build untuk menyalin file ke folder `dist/`.
- `scripts/test.js` : Script test sederhana untuk memastikan file hasil build ada.
- `Jenkinsfile` : Definisi pipeline Jenkins.
- `.github/workflows/ci.yml` : Definisi workflow GitHub Actions untuk build dan test otomatis.

## 4. Konfigurasi GitHub Actions

File workflow: `.github/workflows/ci.yml`

Fungsi:

- Menjalankan setiap ada `push` atau `pull_request` ke branch `main/master`.
- Langkah:
  - Checkout kode.
  - Setup Node.js.
  - `npm install`
  - `npm run build`
  - `npm test`

**Bukti:**

- Screenshot halaman Actions di GitHub yang menunjukkan workflow berhasil.
- Screenshot detail job (log build dan test).

## 5. Konfigurasi Jenkins Pipeline

File pipeline: `Jenkinsfile`

Tahapan:

1. **Checkout**: Mengambil kode dari repository GitHub.
2. **Setup Node.js**: Menyiapkan Node.js (menggunakan `nvm` jika tersedia, atau Node sistem).
3. **Install Dependencies**: `npm install`
4. **Build**: `npm run build`
5. **Test**: `npm test`
6. **Deploy**: Menyalin isi folder `dist/` ke direktori deployment (contoh: `${DEPLOY_DIR}`).

**Catatan:**

- Sesuaikan nilai `DEPLOY_DIR` di dalam `Jenkinsfile` dengan direktori di server Anda.
- Pastikan Jenkins agent memiliki Node.js dan npm ter-install.

## 6. Integrasi GitHub ↔ Jenkins (Webhook)

Langkah umum:

1. Di Jenkins:
   - Install plugin: **GitHub Integration** / **GitHub plugin** (jika belum ada).
   - Buat pipeline baru dengan tipe **Pipeline** dan hubungkan ke repository GitHub (SCM: Git).
   - Centang opsi **GitHub hook trigger for GITScm polling** atau **Build when a change is pushed to GitHub**.

2. Di GitHub:
   - Buka menu **Settings → Webhooks**.
   - Klik **Add webhook**.
   - Isi:
     - Payload URL: `http://<JENKINS_URL>/github-webhook/`
     - Content type: `application/json`
     - Pilih event: **Just the push event**.
   - Simpan webhook.

3. Uji:
   - Lakukan commit dan push ke repository GitHub.
   - Pastikan Jenkins otomatis men-trigger job pipeline.

**Bukti:**

- Screenshot halaman Webhook di GitHub.
- Screenshot job Jenkins yang auto-trigger setelah commit.

## 7. Log dan Status Pipeline

Lampirkan:

- Log GitHub Actions (build & test berhasil/gagal).
- Log Jenkins untuk setiap stage (Checkout, Build, Test, Deploy).
- Status akhir pipeline (success/failure) dengan screenshot.

Tuliskan catatan penting jika terjadi error dan bagaimana cara Anda memperbaikinya.

Contoh catatan:

- _"Build pertama gagal karena Node.js belum ter-install di Jenkins agent. Saya menginstall Node.js dan menjalankan ulang pipeline, hasilnya sukses."_ 

## 8. Kesimpulan

Ringkasan:

- Pipeline otomatis sudah berjalan untuk build, test, dan deploy.
- Integrasi GitHub → Jenkins melalui Webhook berhasil.
- Struktur file pipeline (GitHub Actions + Jenkinsfile) rapi dan dapat digunakan kembali.

_(Tambahkan kesimpulan pribadi atau pembelajaran yang didapat.)_

