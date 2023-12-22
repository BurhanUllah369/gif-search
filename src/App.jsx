import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [gifs, setGifs] = useState([]);
  const [input, setInput] = useState("");
  const [value, setValue] = useState("happy");
  const [copy, setCopy] = useState(false);
  const [gifId, setGifId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [copyText, setCopyText] = useState('Copy Link')

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    setValue(input);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  };

  const handleCopy = (e) => {
    setCopy(true);
    setGifId(e.target.id);
    const buttonIndex = e.target.id;
    navigator.clipboard.writeText(gifs[buttonIndex].images.original.url);
    setCopyText('Copied!')
    setTimeout(() => {
      setCopyText('Copy Link')
    }, 2000);
  };

  useEffect(() => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=Bx0Ij8dEPbx3hHScgw1VHrAOiP3ZeKZc&q=${value}&limit=15&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    fetch(url)
      .then((data) => data.json())
      .then((item) => {
        setGifs(item.data);
      });
  }, [value]);

  return (
    <div className="wrapper">
      <div className="form">
        <input type="text" onChange={handleOnChange} />
        <button className="sub" onClick={handleClick}>
          Submit
        </button>
      </div>
      <div
        className="loader"
        style={showLoader ? { display: "block" } : { display: "none" }}
      ></div>

      {showLoader ? null : (
        <div className="container">
          {gifs.map((gif, i) => (
            <div className="gif" key={gif.id}>
              <div className="image">
                <img src={gif.images.original.url} alt="" />
              </div>
              <button className="copy" onClick={handleCopy} id={i}>
                {gifId == i ? copyText : 'Copy Link'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
