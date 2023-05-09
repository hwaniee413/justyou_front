import React, { useEffect } from "react"


const Location = () => {

    useEffect(() => {
        const initMap = () => {
          // 위치 정보 생성
          const myLatLng = { lat: 37.478750300000, lng: 126.878652500000 };
    
          // 지도 생성
          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 15,
          });
    
          // 마커 생성
          new window.google.maps.Marker({
            position: myLatLng,
            map,
            title: 'My Location',
          });
        };
    
        const loadGoogleMapScript = () => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBl_TlfXjUDb6tz1Sl4rpOJohq0jLuH-JM&libraries=places`;
          script.onload = () => {
            initMap();
          };
          document.head.appendChild(script);
        };
    
        loadGoogleMapScript();
      }, []);
    return (
        <React.Fragment>
            <div className="flex w-100 justify-center">
                <div className="flex-column w-50">
                    <h3>상호명: (주)저스트유</h3>
                    <h3>주소: 서울특별시 금천구 가산디지털2로 123</h3>                    
                    <div className="w-100" id="map" style={{height:'400px'}}></div>                
                </div>
                
            </div>
            
        </React.Fragment>
    )
}
export default Location;