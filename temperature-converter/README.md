# Ứng dụng Hiển thị Thời gian với Capacitor

Ứng dụng đơn giản sử dụng **Capacitor** để hiển thị thời gian hiện tại của người dùng.  
Ngoài ra, ứng dụng hỗ trợ **thông báo cục bộ (Local Notifications)**, **chia sẻ thời gian (Share API)** và **chụp màn hình**.

## 📌 Tính năng chính
✅ Hiển thị thời gian hiện tại khi nhấn nút.  
✅ Gửi thông báo hiển thị thời gian bằng **Local Notifications**.  
✅ Chia sẻ thời gian với **Share API**.  
✅ **(Bonus)** Chụp màn hình và chia sẻ ảnh chụp.

---

## 🚀 Cách cài đặt và chạy ứng dụng
### 1️⃣ Cài đặt Capacitor CLI (nếu chưa có)
    npm install -g @capacitor/cli
2️⃣ Cài đặt dependencies của dự án
    npm install
3️⃣ Build dự án
    npm run build
4️⃣ Đồng bộ với nền tảng (Android/iOS)
    npx cap sync
5️⃣ Chạy ứng dụng trên thiết bị hoặc giả lập
🔹 Android:
npx cap run android
🔹 iOS:
npx cap run ios
📱 Hướng dẫn sử dụng
Nhấn nút Hiển thị thời gian để xem giờ hiện tại.

Hệ thống sẽ gửi thông báo chứa thời gian hiện tại.

Có thể nhấn Chia sẻ để gửi thông tin thời gian.

Dùng nút Chụp màn hình để lưu ảnh và chia sẻ.

📸 Ảnh chụp màn hình (Demo)

💡 Công nghệ sử dụng
Capacitor (Local Notifications, Share API, Filesystem)

HTML, CSS, JavaScript

Framework: Không sử dụng (có thể mở rộng với Vue, React, Angular)

📜 Thông tin bổ sung
Ứng dụng có thể chạy trên cả Android & iOS, tuy nhiên cần thử nghiệm trên thiết bị thật hoặc giả lập để kiểm tra đầy đủ tính năng.

✨ Chúc bạn chạy ứng dụng thành công! 🚀

