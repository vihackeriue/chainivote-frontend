import { memo } from 'react';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap'; // Make sure to import Row and Col
import './style.css';
import PollListSections from '../../../components/pollListSections';
import Slider from 'react-slick';
import CandidateSection from '../../../components/CandidateSection';
import { Link } from 'react-router-dom';


const HomePage = () => {


  const mockData = [
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Introduction to Web Design",
      date: "Sunday, September 26th at 7:00 pm",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      title: "Marketing Strategies",
      date: "Sunday, November 15th at 7:00 pm",
      desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..."
    },
    {
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Creative Thinking",
      date: "Sunday, December 5th at 6:00 pm",
      desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
    },
    {
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Creative Thinking",
      date: "Sunday, December 5th at 6:00 pm",
      desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };


  console.log('HomePage Rendered');
  return (
    <>
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container text-center">
          <h1 className="fw-bold mb-3" data-aos="fade-up" data-aos-delay="100">
            Learning Today,<br />
            Leading Tomorrow
          </h1>
          <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">
            We are team of talented designers making websites with Bootstrap
          </p>

        </div>
      </section>


      <section id="about" className="about section py-5">
        <Container>
          <Row className="align-items-center gy-4">
            {/* Hình ảnh bên phải */}
            <Col lg={6} className="order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
              <img
                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                className="img-fluid rounded"
                alt="Blockchain Voting"
              />
            </Col>

            {/* Nội dung bên trái */}
            <Col lg={6} className="order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
              <h3 className="fw-bold" style={{ fontSize: '1.75rem' }}>
                Nền tảng bình chọn minh bạch ứng dụng Blockchain
              </h3>
              <p className="fst-italic text-muted">
                Hệ thống của chúng tôi đảm bảo mọi lá phiếu được ghi nhận và không thể bị thay đổi, nhờ vào công nghệ Blockchain hiện đại.
              </p>

              {/* Danh sách có icon */}
              <ul className="list-unstyled mb-4">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Mọi cuộc bình chọn đều được ghi nhận minh bạch trên hệ thống sổ cái phân tán.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Không ai có thể chỉnh sửa, xóa bỏ hay gian lận kết quả sau khi đã ghi nhận.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Người dùng có thể kiểm tra lại lịch sử bình chọn bất kỳ lúc nào, hoàn toàn công khai.
                </li>
              </ul>

              {/* Nút Read More */}
              <a href="#" className="btn btn-success px-4 py-2 rounded-pill d-inline-flex align-items-center">
                <span className="me-2">Tìm hiểu thêm</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </section>


      <Container className="py-5">
        <h2 className="text-center mb-4"><b>Các Cuộc Bình Chọn Nổi Bật</b></h2>
        <Slider {...sliderSettings}>
          {mockData.map((item, idx) => (
            <div key={idx} className="px-3">
              <div className="shadow rounded overflow-hidden bg-white h-100">
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.title} className="w-100 object-cover" />
                </div>
                <div className="p-3">
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted fst-italic">{item.date}</p>
                  <p className="text-muted" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
      <div className="text-center py-5">
        <Link
          to="/poll-list"
          className="btn btn-outline-success px-4 py-2 rounded-pill d-inline-flex align-items-center"
        >
          <span className="me-2">Xem thêm</span>
          <i className="bi bi-arrow-right-circle"></i>
        </Link>
      </div>

    </>
  );
}

export default memo(HomePage);
