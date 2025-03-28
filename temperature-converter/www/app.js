// Import các plugin từ Capacitor
const Filesystem = Capacitor.Plugins.Filesystem;
const Share = Capacitor.Plugins.Share;
const LocalNotifications = Capacitor.Plugins.LocalNotifications;

// Enum Directory từ @capacitor/filesystem
const Directory = {
    Cache: 'CACHE'
};

function showCurrentTime() {
    try {
        const now = new Date();
        const timeString = now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        document.getElementById('result').innerHTML = `Thời gian: ${timeString}`;

        if (typeof Capacitor !== 'undefined') {
            // Local Notifications
            LocalNotifications.schedule({
                notifications: [
                    {
                        title: "Thời gian hiện tại",
                        body: `Thời gian: ${timeString}`,
                        id: Math.floor(Math.random() * 1000),
                        schedule: { at: new Date(Date.now() + 1000) }
                    }
                ]
            }).catch(err => console.error("Lỗi thông báo: ", err));

            // Share API
            Share.share({
                title: 'Thời gian hiện tại',
                text: `Thời gian lúc này là: ${timeString}`,
                url: 'https://example.com/time',
                dialogTitle: 'Chia sẻ thời gian'
            }).catch(err => {
                if (err.message !== 'Share canceled') {
                    console.error("Lỗi chia sẻ: ", err);
                    alert("Không thể chia sẻ thời gian: " + err.message);
                }
            });
        }
    } catch (error) {
        console.error("Lỗi hiển thị thời gian: ", error);
        document.getElementById('result').innerHTML = "Đã xảy ra lỗi!";
    }
}

async function captureScreen() {
    if (typeof Capacitor !== 'undefined') {
        if (typeof html2canvas === 'undefined') {
            alert("Không thể tải công cụ chụp màn hình!");
            console.error("html2canvas không khả dụng");
            return;
        }
        try {
            // Chụp màn hình
            const canvas = await html2canvas(document.body);
            const imgData = canvas.toDataURL('image/png');
            const base64Data = imgData.replace(/^data:image\/png;base64,/, "");

            // Lưu ảnh vào bộ nhớ tạm
            const fileName = `screenshot_${Date.now()}.png`;
            const result = await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Cache
            });

            // Chia sẻ tệp ảnh
            await Share.share({
                title: 'Ảnh chụp màn hình',
                text: 'Đây là ảnh chụp màn hình ứng dụng',
                files: [result.uri],
                dialogTitle: 'Chia sẻ ảnh'
            }).then(() => {
                alert("Đã chia sẻ ảnh thành công!");
            }).catch(err => {
                if (err.message !== 'Share canceled') {
                    console.error("Lỗi chia sẻ ảnh: ", err);
                    alert("Không thể chia sẻ ảnh: " + err.message);
                } else {
                    alert("Đã chụp ảnh nhưng bạn đã hủy chia sẻ.");
                }
            });
        } catch (err) {
            console.error("Lỗi chụp màn hình: ", err);
            alert("Không thể chụp màn hình: " + err.message);
        }
    } else {
        // Trên web
        if (typeof html2canvas !== 'undefined') {
            html2canvas(document.body).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'screenshot.png';
                link.click();
                alert("Đã chụp màn hình!");
            }).catch(err => {
                console.error("Lỗi chụp màn hình trên web: ", err);
                alert("Không thể chụp màn hình!");
            });
        } else {
            alert("Tính năng chỉ hoạt động trên thiết bị hoặc cần tải html2canvas!");
        }
    }
}