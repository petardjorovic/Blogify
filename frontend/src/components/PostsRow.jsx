import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PostCard from './PostCard';

function PostsRow({ posts, title }) {
    return (
        <div className="mb-10 relative box overflow-hidden">
            <h2 className="text-xl font-bold mb-3">{title}</h2>
            <div className="relative py-5">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    breakpoints={{
                        0: { slidesPerView: 1.2 },
                        480: { slidesPerView: 1.5 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="!overflow-visible"
                >
                    {posts.map((post) => {
                        return (
                            <SwiperSlide key={post._id}>
                                <div className="w-full max-w-[300px]">
                                    <PostCard post={post} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                {/* Strelice pozicionirane unutar slajdera */}
                <style jsx="true" global="true">{`
                    .swiper-button-next,
                    .swiper-button-prev {
                        @apply p-3 bg-gray-100 hover:bg-gray-300 text-gray-700 rounded-full shadow-lg transition z-10;
                        width: 10px;
                        height: 48px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .swiper-button-next::after,
                    .swiper-button-prev::after {
                        font-size: 28px;
                        font-weight: bold;
                    }

                    .swiper-pagination {
                        margin-bottom: 10px;
                    }

                    .swiper-pagination-bullet {
                        background-color: rgba(0, 0, 0, 0.3);
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                    }

                    .swiper-pagination-bullet-active {
                        background-color: #333;
                        opacity: 0.9;
                    }
                `}</style>
            </div>
        </div>
    );
}

export default PostsRow;
