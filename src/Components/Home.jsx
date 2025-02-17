import Header from "./Header";

const Home = () => {
    return (
            <>
              <Header />
              <div className="absolute inset-0 -z-10">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://cdn.pixabay.com/photo/2016/01/19/01/42/library-1147815_640.jpg')`,
                  }}
                ></div>
                <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10"></div>
              </div>
            </>
      );
      
} ; 

export default Home; 