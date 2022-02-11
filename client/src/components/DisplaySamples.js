import React, { useState, useEffect } from "react";
import GetSamplesListOnSpotify from "./search/GetSamplesListOnSpotify";

export default function DisplaySamples({currPlayingTrack, setCurrPlayingTrack, samples, code}) {    
    const [samplesList, setSamplesList] = useState([])
    const [displaySamples, setDisplaySamples] = useState(false);
    const [samplesToDisplay, setSamplesToDisplay] = useState([]);

    useEffect(() => {
        console.log(samples);
        let spotifySongData = GetSamplesListOnSpotify(samples, code)
        spotifySongData.then(data => {
            setSamplesList(data);
        })
    }, [samples])

    const handleClick = () => {
        setDisplaySamples(!displaySamples);
    }

    const handleChangeMusic = (newSong) => {
        setCurrPlayingTrack(newSong);
    }

    useEffect(() => {
        if(displaySamples && samplesToDisplay.length>0)  {
            setSamplesToDisplay(samplesList.map(song => {
                return song.title + " by " + song.artist;
            }));
        } else {
            setSamplesToDisplay([]);
        }
    }, [displaySamples])

    useEffect(() =>{
        if (displaySamples) handleClick();
    }, [currPlayingTrack])


    return (
        <div>  
            <br></br>
            <button style={{width: "100%"}} onClick={() => handleClick()}>{!displaySamples?"Click for Samples":"Hide Samples"}</button>
            <br></br><br></br>
          
            {samplesList.length >0 && displaySamples ?
                samplesList.map((song,index) => {
                return (
                <div key={index} className="d-flex m-2 align-items-center" style={{ overflowY: "auto" , cursor: "pointer"}} onClick={() => handleChangeMusic(song)}>
                    <img src={song.albumUrl} style={{ height: '94px', width: '94px', marginRight: '15px'}} />
                    <div className="ml-3"> <div> {song.title}</div>
                        <div className="text-muted">{song.artist}</div>
                        <div className="text-muted" style={{fontsize: "2px"}}>({song.type})</div>
                        <br></br>
                    </div>
                </div>)
            }): null}
        </div>
    )
}