import React from 'react';

const PollCard = ({ id, img, title, date, desc, onClick }) => {
    return (
        <div
            className="shadow rounded overflow-hidden bg-white"
            onClick={onClick}
            style={{ cursor: 'pointer', transition: '0.3s', border: '1px solid #eee' }}
        >
            <div style={{ height: '300px', overflow: 'hidden' }}>
                <img src={img} alt={title} style={{ width: '100%', objectFit: 'cover' }} />
            </div>
            <div className="p-4">
                <h5 className="fw-bold">{title}</h5>
                <p className="fst-italic mb-2">{date}</p>
                <p
                    className="mb-0 text-muted"
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        fontSize: '0.95rem',
                        lineHeight: '1.5',
                    }}
                >
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default PollCard;
