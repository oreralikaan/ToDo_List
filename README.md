# Görev Yönetim Uygulaması
Bu proje, kullanıcıların kişisel görevlerini kolayca yönetebilmeleri için tasarlanmış bir to-do list uygulamasıdır. Kullanıcılar hesap oluşturup giriş yaparak kendi görev listelerini oluşturabilir, silebilir ve takip edebilirler.

## Projenin Özellikleri
- **Giriş ve Hesap Oluşturma:**  Kullanıcılar güvenli bir şekilde hesap açabilir ve mevcut hesaplarıyla uygulamaya giriş yapabilir.
- **Görev Ekleme:**  Yeni görevler hızlı ve kolay bir şekilde listeye eklenebilir.
- **Durum Yönetimi:** Görevler tamamlandı olarak işaretlenebilir, bu da işlerin takibini kolaylaştırır.
- **Görev Silme:** Tamamlanan veya gereksiz görülen görevler listeden kalıcı olarak silinebilir.

## Kullanılan Teknolojiler
Proje, modern ve güçlü web teknolojileri kullanılarak geliştirilmiştir:

- **Backend:** Node.js, Express.js

- **Veritabanı:** MongoDB

- **Frontend:** HTML, CSS, JavaScript

## Kurulum ve Çalıştırma
Projeyi kendi bilgisayarında çalıştırmak için aşağıdaki adımları izle.

1- **Depoyu Klonla**
```python
git clone https://github.com/oreralikaan/ToDo_List
```
2- **Bağımlılıkları Yükle:**
*Projenin bağımlılıklarını yüklemek için terminalde aşağıdaki komutu çalıştır*
```python
npm install
```
3- **Veritabanı Bağlantısı:**
*Proje ana dizininde bir .env dosyası oluştur ve MongoDB bağlantı URI'ını ekle:*
```python
MONGODB_URI = "mongodb://127.0.0.1:27017/gorev-yonetim-db" (örneğin)
```
4- **Uygulamayı Başlat**
*Projeyi başlatmak için aşağıdaki komutu kullan:*
```python
npm run dev
```

Uygulama artık http://localhost:3000(port numarası) adresinden erişilebilir durumda olacak.

