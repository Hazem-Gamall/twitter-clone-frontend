import { HttpService } from "./HttpService";

class UserPostWithImageService extends HttpService {
  _convertToFormData(data: any) {
    const formData = new FormData();
    console.log("post with iamge data", data);
    data.media?.length > 0 && formData.append("media", data.media[0]);
    console.log("data text", data.text);
    formData.set("text", data.text);
    data.reply_to && formData.set("reply_to", data.reply_to.id);
    console.log("formdata", formData);

    return formData;
  }
  create<T, Y>(data: T) {
    console.log("new create post with image");

    const controller = new AbortController();
    const formData = this._convertToFormData(data);
    console.log("formdata in create", formData);

    const request = this.apiClient.post<Y>(`${this.endpoint}/`, formData, {
      signal: controller.signal,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default UserPostWithImageService;
