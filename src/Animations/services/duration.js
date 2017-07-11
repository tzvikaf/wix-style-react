class Duration {
  constructor() {
    this.durationMap = {
      micro: 120,
      small: 150,
      medium: 200,
      large: 300
    };

    this.defaults = {
      duration: 300,
      sequenceDelayDuration: 80
    };

  }

  get(props) {
    const {timing, sequenceDelay, children} = props;
    const duration = timing ? this.durationMap[timing] : this.defaults.duration;
    const sequenceDelayDuration = timing && sequenceDelay && children.length > 1 ? children.length * this.defaults.sequenceDelayDuration : 0;
    return duration + sequenceDelayDuration;
  }
}

export default Duration;
