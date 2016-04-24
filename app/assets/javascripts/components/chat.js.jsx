
var Chat = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount(){
    globalVar = (message) => {
      this.receiveMessage(message);
    };
  },
  componentDidMount: function() {
    this.getMessages();
  },
  getMessages: function() {
    $.ajax({
      url: this.props.get_url,
      cache: false,
      success: function(data) {
        this.setState({data: data});
        $('#scroll-panel').animate({scrollTop: $('#scroll-panel').height()});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.get_url, status, err.toString());
      }.bind(this)
    });
  },
  receiveMessage: function(message) {
    if(message.user.id != this.props.user_id) {
      message.orientation = 'left';
      this.setState({last_message: message.text});
    }
    this.setState({data: this.state.data.concat([message])});
    $('#scroll-panel').animate({scrollTop: $('#scroll-panel').height()});
    // this.sendNotification(message);
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
          <ChatHeader getMessages={this.getMessages} title={this.props.title}/>
          <ChatConversations conversations={this.state.data}/>
          <ChatForm post_url={this.props.post_url} channel_id={this.props.channel_id}/>
        </div>
        <a href="http://www.emoji-cheat-sheet.com/" className="cheats" target="_blank">Emoji Cheat Sheet</a>
      </div>
  );
  }
});

var ChatHeader = React.createClass({
  render: function() {
    return (
      <div className="panel-heading">
        <span className="chat-glyphicon fa fa-comment"></span>
         <span> {this.props.title}</span>
        <div className="btn-group pull-right">
          <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
            <span className="chat-glyphicon fa fa-chevron-down"></span>
          </button>
          <ul className="dropdown-menu chat-slidedown slidedown">
            <li>
              <a onClick={this.props.getMessages}>
                <span className="chat-glyphicon fa fa-refresh"></span>Refresh
              </a>
            </li>
            <li className="divider"></li>
            <li>
              <a href="/users/sign_out" data-method="delete" rel="nofollow">
                <span className="chat-glyphicon fa fa-sign-out"></span> Sign Out
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
    return {text: '', last_message: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    this.sendFormData();
  },
  handleKeyDown: function (event) {
    if(event.keyCode == 38) {
      this.setState({text: this.state.last_message});
    }
  },
  sendFormData: function () {
    new_message = this.state.text;
    channel_id = this.props.channel_id;
    $.ajax({
      method: "POST",
      url: this.props.post_url,
      dataType: 'json',
      cache: false,
      data: {
        text: new_message,
        channel_id: channel_id
      },
      success: function(data) {
        this.setState({text: '', last_message: new_message});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.post_url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="panel-footer">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input autoFocus id="new_message" name="new_message" type="text" className="form-control input-sm" placeholder="Type your message here..." value={this.state.text} onChange={this.handleTextChange} autoComplete="off" onKeyDown={this.handleKeyDown} />
            <span className="input-group-btn">
              <button className="btn btn-warning btn-chat" id="btn-chat" type="submit">Send</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
});

var ChatConversation = React.createClass({
  rawMarkup: function() {
    var rawMarkup = md.render(this.props.message.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  componentDidMount: function () {
    jQuery("time.timeago").timeago();
    $('p').linkify({
      target: "_blank"
    });
  },
  render: function() {
    return (
      <li className={"clearfix " + this.props.orientation}>
        <span className={"chat-img pull-" + this.props.orientation}>
          <img src={this.props.user.image} alt="User Avatar" className="chat-img img-circle img-responsive"/>
        </span>
        <div className="chat-body clearfix">
          <div className="header">
            <strong className={ this.props.orientation == 'right' ? "pull-right primary-font" : "primary-font" }>{this.props.user.email}</strong>
            <small>
              <span className={ this.props.orientation == 'right' ? "text-muted" : "pull-right text-muted" }>
                <span className="chat-glyphicon fa fa-clock-o"></span>
                <time className="timeago" dateTime={this.props.time}>{this.props.time}</time>
              </span>
            </small>
          </div>
          <div style={ this.props.orientation == 'right' ? {float: 'right'} : {} }>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
        </div>
      </li>
    );
  }
});
