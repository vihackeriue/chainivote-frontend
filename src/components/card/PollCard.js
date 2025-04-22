import React from 'react';

const PollCard = ({ img, title, date, desc }) => (
    <div className="shadow rounded overflow-hidden bg-white">
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

export default PollCard;
