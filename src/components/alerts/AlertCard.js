import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export const AlertCard = ({alert,   onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
  const [lost , setLost] = useState(false);
  const [found, setFound] = useState(false);
  useEffect(()=>{
    //pongo el alert type si es igual a found en el set found
    if(alert.alertType === 'encontrado'){
      setFound(true);
      setLost(false);
    }else if(alert.alertType === 'perdido'){
      setFound(false);
      setLost(true);
    }
  },[alert.alertType])
  return (
    <Link to={`/alert-detail?alertId=${alert._id}`}>
      <li>
        <div>
          {found && 
            <svg width="33" height="33" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.13566 0.489738C4.28094 0.618204 3.37873 0.995569 2.68002 1.52147C2.12716 1.93497 1.44542 2.69773 1.07232 3.324C0.122626 4.90572 -0.213159 6.82066 0.132801 8.71953C0.566948 11.1202 2.16786 14.4964 4.52854 17.9851C5.13906 18.8883 5.30525 19.1051 5.46127 19.1934C5.71566 19.338 6.06162 19.2858 6.25834 19.065C6.33296 18.9847 6.73997 18.4106 7.05541 17.9489L7.1809 17.7643L6.96383 17.5555C6.72301 17.3187 6.43132 16.9212 6.29565 16.6442L6.20407 16.4596L6.01074 16.7566C5.9056 16.9172 5.80384 17.0537 5.79028 17.0617C5.75636 17.0778 5.40361 16.5599 4.86432 15.7008C3.2668 13.1556 2.09324 10.6586 1.66927 8.92026C1.48273 8.15348 1.43863 7.75203 1.45898 7.07759C1.49968 5.74476 1.91687 4.62872 2.71733 3.68129C3.32107 2.96671 3.95872 2.54518 4.80666 2.29628C5.22385 2.17183 6.00396 2.14373 6.47202 2.23205C7.34031 2.40467 8.10686 2.8543 8.75129 3.57691C9.54497 4.47216 9.9825 5.52798 10.1012 6.84073C10.1487 7.38269 10.1012 7.93268 9.95876 8.59508C9.9011 8.85201 9.84683 9.10091 9.83666 9.14909L9.8197 9.23741L10.0843 9.13704C10.3726 9.02865 10.766 8.99653 11.1391 9.05274L11.3494 9.08485L11.3833 8.9323C11.5088 8.38633 11.5359 8.07721 11.5393 7.29437C11.5393 6.35096 11.4918 5.97359 11.268 5.16667C10.8169 3.53275 9.9011 2.21197 8.60205 1.32476C8.08311 0.971481 7.39797 0.682436 6.75693 0.545942C6.3974 0.47368 5.46467 0.441565 5.13566 0.489738Z" fill="#FF8367"/>
            <path d="M5.43408 3.90203C4.56239 4.04655 3.81959 4.58852 3.3651 5.41953C3.0327 6.03375 2.89364 6.58775 2.89703 7.31439C2.89703 8.21364 3.15142 8.97239 3.67036 9.63479C4.0231 10.0884 4.56918 10.4698 5.07794 10.6224C5.61045 10.7829 6.27524 10.7388 6.80435 10.5019C7.5268 10.1808 8.19159 9.40194 8.46632 8.55889C8.75801 7.67168 8.73427 6.72826 8.39849 5.87718C7.9406 4.70092 7.02482 3.96225 5.93945 3.88999C5.77325 3.87794 5.54601 3.88196 5.43408 3.90203Z" fill="#FF8367"/>
            <path d="M10.4978 10.767C10.1417 10.8914 9.84663 11.337 9.72113 11.9312C9.64651 12.2764 9.66347 13.0834 9.75505 13.4768C9.97891 14.4684 10.4877 15.1067 11.0541 15.1107C11.5798 15.1147 11.9699 14.6771 12.1361 13.8983C12.2039 13.5892 12.1937 12.7863 12.1191 12.4531C11.936 11.6261 11.6273 11.0841 11.1999 10.8432C10.9897 10.7228 10.7081 10.6907 10.4978 10.767Z" fill="#FF8367"/>
            <path d="M13.466 10.8232C13.0828 11.04 12.7911 11.4816 12.6113 12.1159C12.1772 13.6615 12.6486 15.1147 13.5814 15.1107C14.1546 15.1067 14.6566 14.4764 14.8838 13.4728C14.9754 13.0834 14.9923 12.2764 14.9177 11.9312C14.816 11.4414 14.5955 11.056 14.314 10.8593C14.0833 10.6987 13.7103 10.6827 13.466 10.8232Z" fill="#FF8367"/>
            <path d="M7.97121 13.3122C7.7677 13.3884 7.6049 13.5169 7.48279 13.7016C7.05882 14.3399 7.17753 15.3556 7.76431 16.0902C8.01191 16.3993 8.20863 16.5439 8.51728 16.6482C9.03962 16.8289 9.5823 16.5318 9.80277 15.9537C9.90791 15.6687 9.92148 15.1468 9.83329 14.7935C9.56195 13.7498 8.68348 13.0512 7.97121 13.3122Z" fill="#FF8367"/>
            <path d="M15.8807 13.3403C15.4635 13.5129 15.1243 13.8742 14.8971 14.384C14.5036 15.2713 14.6698 16.2227 15.2804 16.576C15.4465 16.6723 15.5144 16.6884 15.7654 16.6884C16.0333 16.6884 16.074 16.6763 16.3216 16.5318C17.0576 16.1023 17.5121 15.0143 17.3018 14.1793C17.2408 13.9344 17.1831 13.814 17.0373 13.6253C16.7761 13.2881 16.2911 13.1676 15.8807 13.3403Z" fill="#FF8367"/>
            <path d="M11.6922 15.9417C10.9968 16.1223 10.4406 16.5278 10.0234 17.146C9.62996 17.7281 9.41628 18.4066 9.4095 19.0971C9.4061 19.4504 9.41628 19.5226 9.4909 19.7193C9.6537 20.1248 9.89791 20.3376 10.5118 20.6066C11.76 21.1485 12.9912 21.1284 14.2156 20.5383C14.6532 20.3255 14.8431 20.177 14.9754 19.9482C15.1755 19.6069 15.2298 19.2215 15.1484 18.6916C14.9516 17.3749 14.1376 16.3271 13.0421 15.9818C12.6724 15.8614 12.0585 15.8453 11.6922 15.9417Z" fill="#FF8367"/>
            </svg>
          }
          {lost && 
             <svg width="33" height="33" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M9.75975 0.833323C7.18016 0.973671 4.67629 1.92721 2.88925 3.45453C1.33443 4.7837 0.370234 6.42247 0.0622984 8.25525C-0.0386641 8.87856 -0.0134235 10.249 0.11278 10.8145C0.511582 12.5937 1.42025 14.0673 2.88925 15.3263C4.48951 16.6926 6.59458 17.5801 8.95205 17.8773C9.70927 17.9723 11.1783 17.9723 11.9304 17.8773C13.8639 17.6297 15.555 17.0105 17.1048 15.9909C17.7005 15.5988 18.0235 15.3346 18.493 14.8599C20.7192 12.5978 21.426 9.69588 20.4315 6.88892C19.1139 3.14906 14.5656 0.573267 9.75975 0.833323ZM12.0516 2.70325C15.3935 3.28941 17.9781 5.44829 18.599 8.17269C18.7353 8.75473 18.7353 10.0261 18.599 10.6081C17.968 13.3821 15.3228 15.5451 11.9304 16.0611C11.2187 16.1725 9.66384 16.1725 8.95205 16.0611C5.61524 15.5533 2.97507 13.4316 2.25319 10.6866C2.15222 10.2986 2.13708 10.1211 2.13708 9.39042C2.13708 8.43275 2.21785 8.00758 2.54598 7.23154C3.52027 4.95295 5.9989 3.16558 8.8309 2.70738C9.59821 2.58354 9.57802 2.58767 10.5927 2.60006C11.3297 2.60831 11.6377 2.62895 12.0516 2.70325Z" fill="#FFBC00"/>
             <path d="M19.5325 15.8093C19.2296 15.8794 18.9671 15.995 18.7551 16.156C18.4169 16.4119 18.1796 16.9486 18.2402 17.3283C18.2755 17.5512 18.4825 17.9764 18.5532 17.9764C18.6087 17.9764 20.9409 16.0652 20.9409 16.0239C20.9409 16.0033 20.8198 15.9455 20.6784 15.8918C20.325 15.7639 19.8808 15.7308 19.5325 15.8093Z" fill="#FFBC00"/>
             <path d="M21.5971 18.5378L20.3604 19.5532L21.6729 20.6017C23.0863 21.7328 23.3034 21.8649 23.8537 21.9185C24.3989 21.9763 25.1359 21.708 25.4388 21.3406C25.6558 21.0806 25.7518 20.7875 25.7316 20.416C25.7013 19.9041 25.6054 19.7927 24.1565 18.5749C23.465 17.997 22.8844 17.5223 22.8693 17.5223C22.8491 17.5223 22.2786 17.9805 21.5971 18.5378Z" fill="#FFBC00"/>
             <path d="M8.96765 5.80297C8.64675 5.88045 8.38085 6.15785 8.26777 6.52771C8.20053 6.74264 8.21582 7.24496 8.29833 7.48987C8.50005 8.10715 8.95848 8.5045 9.46887 8.507C9.94259 8.5095 10.2941 8.2371 10.4438 7.75227C10.5049 7.55984 10.4958 7.06002 10.4285 6.8526C10.2635 6.33778 9.98538 6.0004 9.60029 5.85046C9.41081 5.77548 9.15714 5.75549 8.96765 5.80297Z" fill="#FFBC00"/>
             <path d="M11.6413 5.83797C11.2959 5.97292 11.0331 6.24783 10.8711 6.64268C10.4799 7.60484 10.9047 8.50951 11.7452 8.50701C12.2617 8.50451 12.714 8.11216 12.9188 7.48738C13.0013 7.24497 13.0166 6.74265 12.9493 6.52773C12.8576 6.22283 12.659 5.98292 12.4053 5.86047C12.1975 5.7605 11.8613 5.7505 11.6413 5.83797Z" fill="#FFBC00"/>
             <path d="M6.69034 7.38748C6.50696 7.43496 6.36027 7.51493 6.25024 7.62989C5.86821 8.02725 5.97518 8.65952 6.50391 9.11686C6.72701 9.30929 6.90428 9.39926 7.18239 9.46423C7.65305 9.57669 8.14205 9.39176 8.34071 9.03189C8.43545 8.85445 8.44768 8.52957 8.36821 8.30965C8.12371 7.65988 7.33215 7.22504 6.69034 7.38748Z" fill="#FFBC00"/>
             <path d="M13.8175 7.40498C13.4416 7.51244 13.136 7.73736 12.9312 8.05474C12.5767 8.60704 12.7264 9.19933 13.2766 9.41925C13.4263 9.47923 13.4874 9.48923 13.7136 9.48923C13.9551 9.48923 13.9917 9.48173 14.2148 9.39176C14.878 9.12436 15.2876 8.4471 15.0981 7.92729C15.0431 7.77484 14.9911 7.69987 14.8597 7.58241C14.6244 7.37249 14.1873 7.29751 13.8175 7.40498Z" fill="#FFBC00"/>
             <path d="M10.0434 9.02442C9.41691 9.13688 8.91569 9.38929 8.53977 9.77415C8.18524 10.1365 7.9927 10.5589 7.98659 10.9887C7.98353 11.2086 7.9927 11.2536 8.05994 11.3761C8.20664 11.6285 8.42669 11.7609 8.97987 11.9284C10.1046 12.2658 11.214 12.2533 12.3173 11.8859C12.7115 11.7534 12.8827 11.661 13.0019 11.5185C13.1822 11.3061 13.2311 11.0662 13.1577 10.7363C12.9805 9.9166 12.247 9.26433 11.2598 9.04941C10.9267 8.97444 10.3735 8.96444 10.0434 9.02442Z" fill="#FFBC00"/>
             </svg>
          }
            <h2>{alert.type} {alert.alertType}</h2>
        </div>
        <img src={alert.img} alt={alert.type}/>
        <p>Color: {alert.color1}, tamaño: {alert.size}</p>
        <p><i className="bi bi-geo-alt"></i>{alert.state}, {alert.country}</p>
        {showButtons && (
          <>
             <Link to={`/alerts-edit?alertId=${alert._id}`}>
            <button className="btnEdit">
              <i className="bi bi-pencil"/>
            </button>
            </Link>
            <button onClick={() => onDeleteClick(alert._id)} className="btnDelete">
              <i className="bi bi-trash iDelete"/>
            </button>
          </>
        )}
    </li>
    </Link>
    
  )
}
