var LeftNavBar = React.createClass({
  getInitialState: function() {
    return {channels: []};
  },
  componentDidMount: function() {
    this.getChannels();
  },
  getChannels: function() {
    $.ajax({
      url: this.props.url + '?group_id=' + this.props.current_group,
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
              <a data-toggle="modal" data-target="#changeGroup">
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

        <UserInfoModal groups={this.props.groups}/>
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
        <a href="#" data-toggle="modal" data-target="#changeGroup">{this.props.user.email}</a>
      </li>
    );
  }
});

var UserInfoModal = React.createClass({
  render: function () {
    return (
      <div className="modal fade" id="changeGroup" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form action="/groups/switch">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Switch Group</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <select className="form-control" name="group_id">
                    {
                      this.props.groups.map(function(group){
                        return (
                          <option key={group.id} value={group.id}>{group.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Switch</button>
              </div>
              </form>
          </div>
        </div>
      </div>
    );
  }
});
