const Overlay = ({ imageUrl, onClose }) => {
    return (
      <div className="overlay" onClick={onClose}>
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
          <img src={imageUrl} alt="SDK Placement Screenshot" className="overlay-image" />
          <button className="overlay-close-btn" onClick={onClose}>X</button>
        </div>
      </div>
    );
  };
 export default Overlay 