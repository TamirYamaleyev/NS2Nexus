import PropTypes from 'prop-types';
import SecondaryStatBox from './SecondaryStatBox';

const StatBoxHolder = ({ stats }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {stats.map((stat, index) => (
                <div key={index} style={{ flex: '0 0 50%', maxWidth: '50%' }}>
                    <SecondaryStatBox number={stat.number} title={stat.title} />
                </div>
            ))}
        </div>
    );
};

StatBoxHolder.propTypes = {
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default StatBoxHolder;
