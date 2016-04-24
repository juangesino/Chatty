var LeftNavBar = React.createClass({
  render: function() {
    console.log(this.props.user);
    var channels = [
      {
        id: 1,
        name: 'ChattyGeneral',
        url: '/',
        active: true
      },
    ];
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
              channels.map(function(channel) {
                return (
                  <LeftNavBarItem url={channel.url} key={channel.id} active={channel.active}>{channel.name}</LeftNavBarItem>
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
        <a href={this.props.url}><span className="channel-hash">#</span> {this.props.children}</a>
      </li>
    );
  }
});

var LeftNavBarUserInfo = React.createClass({
  render: function() {
    console.log(this.props.image);
    return (
      <li className="user-info">
        <img src={this.props.image} alt="User Avatar" className="chat-img img-circle img-responsive"/>
        <a href="#">{this.props.user.email}</a>
      </li>
    );
  }
});
