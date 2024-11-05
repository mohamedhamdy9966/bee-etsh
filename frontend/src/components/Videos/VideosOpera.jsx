import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Videos.css";

const videos = [
  {
    category: "Popular Disorder",
    items: [
      {
        title: "ASTHMA AND COPD",
        src: "https://www.youtube.com/embed/-DVZ9pl0rGY",
      },
      {
        title: "NSAIDS & PROSTAGLANDINS",
        src: "https://www.youtube.com/embed/I1uHkbocRCw",
      },
      {
        title: "ANTI HISTAMINES",
        src: "https://www.youtube.com/embed/D5PHANcdA_E",
      },
    ],
  },
  {
    category: "Endocrine & Hormones",
    items: [
      {
        title: "PITUITARY AND THYROID",
        src: "https://www.youtube.com/embed/rqFvilz_Ss0",
      },
      { title: "DIABETES", src: "https://www.youtube.com/embed/LWDQyaKVols" },
      {
        title: "MENSTURAL CYCLE",
        src: "https://www.youtube.com/embed/TfN9-SamIss",
      },
    ],
  },
  {
    category: "Chemotherapeutic",
    items: [
      {
        title: "ANTIBIOTICS",
        src: "https://www.youtube.com/embed/mMk6VWVpRpo?si=X1xfew-Wbd9NLLm7",
      },
      {
        title: "ANTIBIOTICS 2",
        src: "https://www.youtube.com/embed/5HQmvQJWzNY?si=MCSW6DLOTPil_MEs",
      },
      {
        title: "CANCER HORMONAL THERAPY",
        src: "https://www.youtube.com/embed/KgrXNlk89vs?si=IGLFFK2pmAtvKAJd",
      },
      {
        title: "CANCER 2",
        src: "https://www.youtube.com/embed/RqDzfe7XZ8U?si=oNMFhIp2pxU62P6F",
      },
      {
        title: "CANCER 3",
        src: "https://www.youtube.com/embed/AKduVr2ylpw?si=WltcOqfnfwyecAjo",
      },
      {
        title: "CANCER 4 IMMUNOSUPRESSANTS",
        src: "https://www.youtube.com/embed/vWh1AJwAIg0?si=ICxFh1rxwzyArWsF",
      },
    ],
  },
  {
    category: "General Pharmacology",
    items: [
      {
        title: "PHARMACOKINETICS",
        src: "https://www.youtube.com/embed/NKV5iaUVBUI?si=oBvd04Ooxqs2gBdl",
      },
      {
        title: "PHARMACODYNAMICS",
        src: "https://www.youtube.com/embed/tobx537kFaI?si=UyFjSq-WU3NTGinn",
      },
      {
        title: "DRUG INTERACTIONS",
        src: "https://www.youtube.com/embed/BayzMj3n5_I?si=mtNA6GqZBZS0539K",
      },
    ],
  },
  {
    category: "Cardio Vascular",
    items: [
      {
        title: "HYPERTENSION & ANTIHYPERTENSIVES",
        src: "https://www.youtube.com/embed/V2sEay-E-Ro?si=lXS__Ad5seOeALRD",
      },
      {
        title: "DIURETICS",
        src: "https://www.youtube.com/embed/9OBvNpnS0h4?si=R9RgJLMkiXkBY_GS",
      },
      {
        title: "ARRHYTHMIA",
        src: "https://www.youtube.com/embed/9xSqezCMHnw?si=i3XY9144uD5YM43T",
      },
      {
        title: "ANTI COAGULANTS",
        src: "https://www.youtube.com/embed/eZBtQ0rDnG4?si=G-nyxt0IkdjsfgU4",
      },
      {
        title: "HYPERLIPIDEMIA",
        src: "https://www.youtube.com/embed/Of1Aewx-zRM?si=5FsdQ0gahBMNxrKS",
      },
      {
        title: "HEART FAILURE",
        src: "https://www.youtube.com/embed/AJV1BsRnImA?si=k83WiXHtPBbvitAV",
      },
    ],
  },
  {
    category: "AUTONOMIC NERVOUS",
    items: [
      {
        title: "AUTONOMIC NERVOUS DRUGS",
        src: "https://www.youtube.com/embed/qeXP_ricT4s?si=KW846HNXczxL8imp",
      },
      {
        title: "CHOLENERGIC DRUGS",
        src: "https://www.youtube.com/embed/r-gJaMoMon0?si=LHAfG3zF3NVvB8Nb",
      },
      {
        title: "ANTI CHOLENERGIC",
        src: "https://www.youtube.com/embed/cp_CZpCBVpk?si=Y6EDWW_YwWHkBRdE",
      },
      {
        title: "ADRENERGIC RECEPTORS",
        src: "https://www.youtube.com/embed/KtmV-yMDYPI?si=L5St__R9akj-64AJ",
      },
      {
        title: "ALPHA & BETA BLOCKERS",
        src: "https://www.youtube.com/embed/41Xloc_vvX8?si=GzlkDVwYqkMOVcwt",
      },
    ],
  },
  {
    category: "Psychotic",
    items: [
      {
        title: "ANTIDEPRESSANTS",
        src: "https://www.youtube.com/embed/T25jvLC6X0w?si=nBPXIaawZPPm5Hjs",
      },
      {
        title: "BENZODIAZEPINES",
        src: "https://www.youtube.com/embed/4ZHudeMho8g?si=VYrPs6aEBYZx9VRP",
      },
      {
        title: "ANTIPSYCHOTICS",
        src: "https://www.youtube.com/embed/nKkIh1B2Js8?si=HSewMJw01oD-Lojz",
      },
      {
        title: "ANTIEPILEPTIC",
        src: "https://www.youtube.com/embed/xFUHE9gX6W8?si=5mlCE0IioY4H_QRV",
      },
      {
        title: "PARKINSON DISEASE",
        src: "https://www.youtube.com/embed/Z84iypHdftQ?si=iEAtK4ic_sPbaFHM",
      },
      {
        title: "ALZHEIMER DISEASE",
        src: "https://www.youtube.com/embed/euzRPrvrwj0?si=mdjACYD0xFuxhpJM",
      },
      {
        title: "GENERAL & LOCAL ANESTHETICS",
        src: "https://www.youtube.com/embed/wx3dZmv5pM0?si=To-ahBig3I_f9Ax3",
      },
      {
        title: "NARCOTICS & OPIUM",
        src: "https://www.youtube.com/embed/t2tKyjj7u5Y?si=ArQfTVWR8RGKnYel",
      },
    ],
  },
];

function VideosOpera() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            navigate("/login");
            return false;
        }
        setLoggedIn(true);
        return true;
    };

    return (
        <div className="videos-container">
            {loggedIn ? (
                <>
                    {videos.map((section, index) => (
                        <div key={index} className="video-section">
                            <h2>{section.category}</h2>
                            <hr />
                            {section.items.map((video, idx) => (
                                <div key={idx} className="video-item">
                                    <h3>{video.title}</h3>
                                    <div className="video-wrapper">
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={video.src}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            ) : (
                <p>You need to be logged in to view the videos.</p>
            )}
        </div>
    );
}

export default VideosOpera;
