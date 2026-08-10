const VIDEO_ID = 'xpVEeYIsyPc';

export default function HomeVideoPip() {
  return (
    <aside className="home-video" aria-label="경기우파청년들 영상">
      <div className="home-video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&controls=1&rel=0`}
          title="경기우파청년들 활동 영상"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="home-video-caption">
        <span>WATCH</span>
        <p>경기우파청년들의 현장 기록</p>
      </div>
    </aside>
  );
}
