# Apple Education Store — Dự Án Nhóm

Xây dựng lại trang **Cửa Hàng Giáo Dục Apple** và trang **Mua iPad Pro** bằng HTML, CSS, JavaScript thuần.

| Trang             | URL gốc tham khảo                                   |
| ----------------- | --------------------------------------------------- |
| Cửa Hàng Giáo Dục | https://www.apple.com/vn-edu/store                  |
| Mua iPad Pro      | https://www.apple.com/vn-edu/shop/buy-ipad/ipad-pro |

---

## Cấu trúc thư mục

```
apple-store/
│
├── index.html              # FE-1: Trang Cửa Hàng Giáo Dục Apple
├── buy-ipad-pro.html       # FE-2: Trang Mua iPad Pro
│
├── tham-khảo/
│   ├── root-page.html      # HTML gốc tải về từ trang Cửa Hàng Giáo Dục
│   └── buy-apple.html      # HTML gốc tải về từ trang Mua iPad Pro
│
├── css/
│   ├── main.css            # Global styles, CSS variables, reset
│   ├── edu-store.css       # Styles riêng cho index.html
│   ├── buy-ipad-pro.css    # Styles riêng cho buy-ipad-pro.html
│   └── components/
│       ├── header.css      # Global navigation + segment bar (dùng chung)
│       ├── footer.css      # Global footer (dùng chung)
│       ├── product-card.css      # Card & shelf components (dùng chung)
│       └── customer-form.css     # Form thông tin khách hàng
│
├── js/
│   ├── app.js              # Logic tương tác của index.html
│   └── buy-ipad-pro.js     # Logic tương tác của buy-ipad-pro.html
│
└── images/
    ├── products/           # Ảnh sản phẩm (iPad Pro, gallery ảnh, ...)
    ├── icons/              # Icon SVG
    └── backgrounds/        # Ảnh nền hero section
```

---

## Các section trong `index.html` (FE-1)

| #   | Section                | Mô tả                                                                       |
| --- | ---------------------- | --------------------------------------------------------------------------- |
| 1   | Global Header          | Segment bar (Education) + Apple global nav với flyout submenu               |
| 2   | Store Hero             | Tiêu đề "Cửa Hàng Giáo Dục", subheadline, nút Kết Nối Chuyên Gia            |
| 3   | Product Nav Shelf      | Scroll ngang: Mac, iPad, iPhone, Watch, AirPods, AirTag, Apple TV, Phụ Kiện |
| 4   | Trợ Giá Cho Giáo Dục   | Cards sản phẩm giảm giá: MacBook, iPad, iPhone, Watch, AirPods, Phụ kiện    |
| 5   | Apple Store Highlights | 6 cards vuông dưới "Apple Store tạo nên mọi khác biệt."                     |
| 6   | Mac Shelf              | Cards dòng sản phẩm Mac (với link điều hướng)                               |
| 7   | iPad Shelf             | Cards dòng sản phẩm iPad — card iPad Pro liên kết tới buy-ipad-pro.html     |
| 8   | iPhone Shelf           | Cards dòng sản phẩm iPhone                                                  |
| 9   | Watch & Accessories    | Cards Apple Watch, AirPods, Phụ kiện                                        |
| 10  | Global Footer          | Directory links 5 cột + bottom bar pháp lý                                  |

---

## Các section trong `buy-ipad-pro.html` (FE-2)

| #   | Section            | Mô tả                                                                    |
| --- | ------------------ | ------------------------------------------------------------------------ |
| 1   | Global Header      | Segment bar (Education) + Apple global nav (dùng chung)                  |
| 2   | Sticky Bar         | Thanh cố định khi cuộn: tên SP + giá + trạng thái giao hàng              |
| 3   | BFE Header         | H1 "Mua iPad Pro" + giá + badge giáo dục + link Trade In                 |
| 4   | BFE Main (2 cột)   | **Cột trái**: gallery ảnh iPad Pro (2 ảnh + dot/paddle nav)              |
|     | → Step 1           | **Phiên bản**: 11 inch (từ 27.199.000đ) / 13 inch (từ 37.199.000đ)       |
|     | → Step 2           | **Màu**: Đen Không Gian / Bạc                                            |
|     | → Step 3           | **Dung lượng, bộ nhớ, chip**: 256GB / 512GB / 1TB / 2TB                  |
|     | → Step 4           | **Kính màn hình**: Tiêu chuẩn / Nano-texture                             |
|     | → Step 5           | **Kết nối**: Wi-Fi / Wi-Fi + Cellular                                    |
|     | → Step 6           | **Khắc**: Thêm khắc miễn phí / Không khắc                                |
|     | → Step 7           | **Apple Pencil**: Pro (3.168.000đ) / USB-C (1.885.000đ) / Không          |
|     | → Step 8           | **Bàn phím**: Magic Keyboard 11" (7.602.000đ) / 13" (9.068.000đ) / Không |
|     | → Step 9           | **Apple Trade In**: Đổi cũ lấy 900.000đ–24.100.000đ / Không              |
|     | → Step 10          | **AppleCare+**: Thêm (3.799.000đ) / Không                                |
|     | → Summary          | Tên SP + giá tổng + nút "Tiếp tục" + icon yêu thích                      |
| 5   | Form Khách Hàng    | _(Tính năng bổ sung)_ Họ tên + Số điện thoại + Gửi thông tin             |
| 6   | Trong hộp có gì    | iPad Pro + Cáp USB-C + Bộ Tiếp Hợp Nguồn USB-C 20W                       |
| 7   | Câu Hỏi Thường Gặp | Accordion 5 câu hỏi (Pencil, Keyboard, Kính, SIM, AppleCare+)            |
| 8   | Sticky Chat        | Nút chat cố định góc phải — "Hỏi Chuyên Gia iPad"                        |
| 9   | Global Footer      | Directory links 5 cột + bottom bar pháp lý (dùng chung)                  |

---

## Yêu cầu dự án

- Giao diện và tương tác giống trang Apple gốc
- Không cần xây dựng pop-up hoặc trang con liên quan
- Không cần xử lý hiệu ứng thay đổi ảnh/giá khi chọn cấu hình
- Card iPad Pro trên `index.html` liên kết tới `buy-ipad-pro.html`
- `buy-ipad-pro.html` có form thông tin khách hàng (họ tên, số điện thoại)
- Truy cập được trên domain bất kỳ (không phụ thuộc server đặc biệt)
