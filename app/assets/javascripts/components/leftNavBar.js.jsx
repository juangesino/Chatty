var LeftNavBar = React.createClass({
  getInitialState: function() {
    return {channels: []};
  },
  componentDidMount: function() {
    this.getChannels();
  },
  getChannels: function() {
    $.ajax({
      url: this.props.url,
      cache: false,
      success: function(data) {
        this.setState({channels: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    current_channel = this.props.current_channel.id;
    root_url = this.props.root_url;
    return (
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a href={this.props.root_url}>
                {this.props.title}
              </a>
            </li>
            {
              this.state.channels.map(function(channel) {
                return (
                  <LeftNavBarItem url={root_url + 'channels/' + channel.id} key={channel.id} active={current_channel == channel.id ? true : false}>{channel.name}</LeftNavBarItem>
                );
              })
            }
            <LeftNavBarUserInfo user={this.props.user} image={this.props.image}/>
          </ul>
        </div>
      </div>
    );
  }
});

var LeftNavBarItem = React.createClass({
  render: function() {
    return (
      <li className={this.props.active ? "active" : ""}>
        <a href={this.props.url}><span className="channel-hash"><i className="fa fa-hashtag"></i></span> {this.props.children}</a>
      </li>
    );
  }
});

var LeftNavBarUserInfo = React.createClass({
  render: function() {
    return (
      <li className="user-info">
        <img src={this.props.image} alt="User Avatar" className="chat-img img-circle img-responsive"/>
        <a href="#">{this.props.user.email}</a>
      </li>
    );
  }
});
