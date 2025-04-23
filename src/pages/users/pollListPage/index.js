import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PollCard from '../../../components/card/PollCard';


const PollListPage = () => {
    const navigate = useNavigate();

    const mockData = [
        {
            id: 1,
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            title: "Introduction to Web Design",
            date: "Sunday, September 26th at 7:00 pm",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 2,
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            title: "Marketing Strategies",
            date: "Sunday, November 15th at 7:00 pm",
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium..."
        },
        {
            id: 3,
            img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            title: "Creative Thinking",
            date: "Sunday, December 5th at 6:00 pm",
            desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
        },
        {
            id: 4,
            img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            title: "Creative Thinking",
            date: "Sunday, December 5th at 6:00 pm",
            desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam..."
        }
    ];

    return (
        <Container className="py-5">
            <h2 className="mb-4">Danh sách cuộc bình chọn</h2>
            <Row className="gy-4">
                {mockData.map((poll) => (
                    <Col key={poll.id} lg={4} md={6}>
                        <PollCard
                            {...poll}
                            onClick={() => navigate(`/poll-detail/${poll.id}`)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default memo(PollListPage);
