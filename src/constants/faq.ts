export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQ: FaqItem[] = [
  {
    q: "Apakah VektorAha gratis?",
    a: "Ya. Pasfoto Studio dan Gaya Anime bisa dipakai gratis tanpa daftar akun. Kuota AI harian dibatasi supaya layanan tetap gratis untuk semua orang.",
  },
  {
    q: "Apakah foto saya disimpan?",
    a: "Tidak. Penghapusan latar pasfoto berjalan langsung di browser. Untuk fitur AI, foto hanya dikirim ke penyedia AI untuk diproses lalu hasilnya dikembalikan ke kamu, tanpa disimpan di server kami.",
  },
  {
    q: "Foto seperti apa yang hasilnya paling bagus?",
    a: "Foto dengan wajah menghadap depan, cahaya cukup, tidak buram, dan hanya berisi satu orang. Foto yang terlalu gelap, polos, atau tanpa wajah akan ditolak otomatis.",
  },
  {
    q: "Apakah wajah saya tetap mirip setelah diubah jadi anime?",
    a: "AI diarahkan untuk mempertahankan wajah, rambut, ekspresi, dan pakaian dari foto asli, hanya gaya gambarnya yang diubah. Hasil bisa sedikit berbeda tiap kali dibuat, jadi kamu bisa tekan Buat ulang.",
  },
];

export const PASFOTO_FAQ: FaqItem[] = [
  {
    q: "Berapa ukuran pasfoto untuk lamaran kerja?",
    a: "Ukuran yang paling umum diminta untuk lamaran kerja adalah 3×4 cm. Beberapa instansi meminta 4×6 cm, jadi selalu cek ketentuan di lowongan yang kamu lamar.",
  },
  {
    q: "Latar pasfoto sebaiknya merah atau biru?",
    a: "Tidak ada aturan baku untuk semua keperluan. Latar merah dan biru sama-sama umum di Indonesia, sementara paspor dan visa biasanya meminta latar putih. Ikuti warna yang diminta instansi tujuan.",
  },
  {
    q: "Bagaimana cara mencetak pasfoto dari VektorAha?",
    a: "Pilih Lembar cetak 4R, unduh file JPG-nya, lalu cetak di tempat cuci foto atau percetakan dengan ukuran kertas 4R (10,2 × 15,2 cm). Hasil diekspor dalam 300 dpi supaya tetap tajam.",
  },
  {
    q: "Apa bedanya mode Studio AI dan Hapus latar saja?",
    a: "Studio AI merapikan pakaian dan pencahayaan dengan AI. Hapus latar saja hanya mengganti latar belakang, sehingga wajah dan pakaian 100% sesuai foto asli dan prosesnya berjalan di browser.",
  },
];
