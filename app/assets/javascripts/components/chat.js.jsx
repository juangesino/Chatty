var Chat = React.createClass({
  getInitialState: function() {
    // Remove last_message after implementing websockets
    return {data: [], last_message: 0};
  },
  componentDidMount: function() {
    this.getMessages();
    setInterval(this.getMessages, 2000);
  },
  getMessages: function() {
    $.ajax({
      url: "/ajax/messages",
      cache: false,
      success: function(data) {
        // TODO: Remove this after implementing websockets
        // if(this.state.last_message != data[data.length - 1].id && this.state.last_message != 0 && data[data.length - 1].user.id != this.props.user_id) { this.sendNotification(data[data.length - 1]); };
        // Remove last_message after implementing websockets
        this.setState({data: data, last_message: data[data.length - 1].id});
        $('#scroll-panel').animate({scrollTop: $('#scroll-panel').height()});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  receiveMessage: function(message) {
    this.setState({data: this.state.data.concat([message])});
  },
  // sendNotification: function(message) {
  //   if (Notification.permission !== "granted")
  //     Notification.requestPermission();
  //   else {
  //     var notification = new Notification(message.user.email, {
  //       icon: message.user.image,
  //       body: message.text,
  //     });
  //     notification.onclick = function () {
  //       window.focus();
  //       notification.close();
  //     };
  //   }
  // },
  render: function() {
    return (
      <div className="chatApp">
        <div className="chat-panel panel panel-primary">
          <ChatHeader getMessages={this.getMessages}/>
          <ChatConversations conversations={this.state.data}/>
          <ChatForm/>
        </div>
      </div>
  );
  }
});

var ChatHeader = React.createClass({
  render: function() {
    return (
      <div className="panel-heading">
        <span className="chat-glyphicon glyphicon glyphicon-comment"></span>
         <span> Chat</span>
        <div className="btn-group pull-right">
          <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
            <span className="chat-glyphicon glyphicon glyphicon-chevron-down"></span>
          </button>
          <ul className="dropdown-menu chat-slidedown slidedown">
            <li>
              <a onClick={this.props.getMessages}>
                <span className="chat-glyphicon glyphicon glyphicon-refresh"></span>Refresh
              </a>
            </li>
            <li className="divider"></li>
            <li>
              <a href="/users/sign_out" data-method="delete" rel="nofollow">
                <span className="chat-glyphicon glyphicon glyphicon-off"></span> Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

var ChatConversations = React.createClass({
  render: function() {
    return (
      <div className="chat-panel-body panel-body" id="scroll-panel">
        <ul className="chat">
          {this.props.conversations.map(function(conversation) {
            return (
              <ChatConversation key={conversation.id} user={conversation.user} message={conversation.text} orientation={conversation.orientation} time={conversation.time} />
            );
          })}
        </ul>
      </div>
    );
  }
});

var ChatForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.sendFormData();
  },
  sendFormData: function () {
    new_message = this.state.text;
    $.ajax({
      method: "POST",
      url: "/ajax/messages",
      dataType: 'json',
      cache: false,
      data: {
        text: new_message
      },
      success: function(data) {
        this.setState({text: ''});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="panel-footer">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input id="new_message" name="new_message" type="text" className="form-control input-sm" placeholder="Type your message here..." value={this.state.text} onChange={this.handleTextChange} autoComplete="off" />
            <span className="input-group-btn">
              <button className="btn btn-warning btn-sm" id="btn-chat" type="submit">Send</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
});

var ChatConversation = React.createClass({
  render: function() {
    return (
      <li className={"clearfix " + this.props.orientation}>
        <span className={"chat-img pull-" + this.props.orientation}>
          <img src={this.props.user.image} alt="User Avatar" className="chat-img img-circle img-responsive"/>
        </span>
        <div className="chat-body clearfix">
          <div className="header">
            <strong className={ this.props.orientation == 'right' ? "pull-right primary-font" : "primary-font" }>{this.props.user.email}</strong>
            <small className={ this.props.orientation == 'right' ? "text-muted" : "pull-right text-muted" }><span className="chat-glyphicon glyphicon glyphicon-time"></span>{this.props.time}</small>
          </div>
          <p style={ this.props.orientation == 'right' ? {float: 'right'} : {} }>
            {this.props.message}
          </p>
        </div>
      </li>
    );
  }
});
