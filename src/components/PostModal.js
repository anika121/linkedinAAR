import styled from "styled-components";
import ReactPlayer from "react-player";
import firebase from "firebase";
import { connect } from "react-redux";
import { useState } from "react";

import { postArticleAPI } from "../redux/actions";

function PostModal(props) {
	const [editorText, setEditorText] = useState("");
	const [shareImage, setShareImage] = useState("");
	const [videoLink, setVideoLink] = useState("");
	const [assetArea, setAssetArea] = useState("");

	const handleChange = (e) => {
		const image = e.target.files[0];

		if (image === "" || image === undefined) {
			alert(`That is not an image. That was a ${typeof image} file`);
			return;
		}
		setShareImage(image);
	};

	const switchAssetArea = (area) => {
		setShareImage("");
		setVideoLink("");
		setAssetArea(area);
	};

	const postArticle = (e) => {
		e.preventDefault();
		if (e.target !== e.currentTarget) {
			console.log("Hi")
			return;
		}

		const payload = {
			image: shareImage,
			video: videoLink,
			user: props.user,
			description: editorText,
			timestamp: firebase.firestore.Timestamp.now(),
		};

		props.postArticle(payload);
		reset(e);
	};

	const reset = (e) => {
		setEditorText("");
		setShareImage("");
		setVideoLink("");
		setAssetArea("");
		props.handleClick(e);
	};

	return (
		<>
			{props.showModal === "open" && (
				<Container>
					<Content>
						<Header>
							<h2>Create a Post</h2>
							<button onClick={(event) => reset(event)}>
								<img src="/images/close-icon.png" alt="X" />
							</button>
						</Header>
						<SharedContent>
							<UserInfo>
								{props.user ? (
									<img src={props.user.photoURL} />
								) : (
									<img src="/images/user.svg" />
								)}
								<span>Name</span>
							</UserInfo>
							<Editor>
								<textarea
									value={editorText}
									onChange={(e) =>
										setEditorText(e.target.value)
									}
									placeholder=" What do you want to talk about?"
									autoFocus={true}
								/>
								{assetArea === "image" ? (
									<UploadImage>
										<input
											type="file"
											accept="image/gif, image/jpeg, image/jpg, image/png"
											name="image"
											id="file"
											onChange={handleChange}
											style={{ display: "none" }}
										/>
										<p>
											<label htmlFor="file">
												Select an image
											</label>
										</p>
										{shareImage && (
											<img
												src={URL.createObjectURL(
													shareImage
												)}
											/>
										)}
									</UploadImage>
								) : (
									assetArea === "media" && (
										<>
											<input
												type="text"
												placeholder="URL for video to share"
												value={videoLink}
												onChange={(e) =>
													setVideoLink(e.target.value)
												}
												style={{
													width: "100%",
													height: "30px",
													fontSize: "14px",
													outlineColor: "#0a66c2",
													marginBottom: "10px",
												}}
											/>
											{videoLink && (
												<ReactPlayer
													width={"100%"}
													url={videoLink}
												/>
											)}
										</>
									)
								)}
							</Editor>
						</SharedContent>
						<SharedCreation>
							<AttachAssets>
								<AssetButton
									onClick={() => switchAssetArea("image")}
								>
									<img src="/images/share-image.png" alt="" />
								</AssetButton>
								<AssetButton
									onClick={() => switchAssetArea("media")}
								>
									<img src="/images/share-video.png" alt="" />
								</AssetButton>
							</AttachAssets>
							<ShareComment>
								<AssetButton
									style={{ justifyContent: "center" }}
								>
									<img
										src="/images/share-comment.png"
										alt=""
										style={{ width: 45, height: 40 }}
									/>
									Anyone
								</AssetButton>
							</ShareComment>

							<PostButton disabled={!editorText ? true : false} onClick={(event) => postArticle(event)}>
								Post
							</PostButton>
						</SharedCreation>
					</Content>
				</Container>
			)}
		</>
	);
}

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	color: black;
	background-color: rgba(0, 0, 0, 0.8);
	animation: fadeIn 0.3s;
`;

const Content = styled.div`
	width: 100%;
	max-width: 552px;
	background-color: white;
	max-height: 90%;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: flex;
	padding: 16px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.04);
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.7);
	h2 {
		font-weight: 500;
	}
	justify-content: space-between;
	align-items: center;
	button {
		height: 40px;
		width: 40px;
		min-width: auto;
		color: rgba(0, 0, 0, 0.15);
		background-color: transparent;
		border: none;
		margin-top: -2px;
		cursor: pointer;
		img {
			height: 35px;
			width: 35px;
			pointer-events: none;
		}
	}
`;

const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	vertical-align: auto;
	background: transparent;
	padding: 8px 12px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 12px 24px;

	img {
		width: 48px;
		height: 48px;
		background-clip: content-box;
		border: 2px solid transparent;
		border-radius: 50%;
		margin-right: 8px;
	}

	span {
		font-weight: 200;
		font-size: 16px;
		line-height: 1.5;
	}
`;

const SharedCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	color: rgba(0, 0, 0, 0.5);
	background: transparent;
	border: none;
	transition-duration: 70ms;
	justify-content: center;
	border-radius: 6px;

	&:hover {
		background: rgba(0, 0, 0, 0.06);
	}

	img {
		height: 20px;
	}
`;

const AttachAssets = styled.div`
	align-items: center;
	display: flex;
	padding-right: 8px;
	${AssetButton} {
		width: 40px;
	}
`;

const ShareComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	border-left: 1px solid rgba(0, 0, 0, 0.15);
	& > ${ AssetButton } > img {
		width: 30px !important;
		height: 27px !important;
		margin-right: 8px;
	}
`;

const PostButton = styled.button`
	min-width: 60px;
	border-radius: 20px;
	background: ${(props) =>
		props.disabled ? "rgba(0, 0, 0, 0.3)" : " #0a66c2"};
	color: white;
	border: 1px solid black;
	outline: none;
	cursor: pointer;
	transition-duration: 60ms;
	&:hover {
		background: ${(props) =>
			props.disabled ? "rgba(0, 0, 0, 0.35)" : " #004182"};
	}
`;

const Editor = styled.div`
	padding: 12px 24px;
	textarea {
		width: 100%;
		min-height: 100px;
		resize: none;
		outline: none;
		border: none;
	}
`;

const UploadImage = styled.div`
	text-align: center;
	img {
		width: 100%;
	}

	& > p {
		margin-bottom: 13px;
		& > label {
			background-color: rgba(0, 0, 0, 0.1);
			cursor: pointer;
			padding: 8px;
			border-radius: 6px;

			&:hover {
				background-color: rgba(0, 0, 0, 0.08);
			}
		}
	}
`;

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	postArticle: (payload) => dispatch(postArticleAPI(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
