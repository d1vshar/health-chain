import axios from 'axios';
import { ApiResponse, AuditEvent } from '.';
// import { AuthState } from '../store/authState';
import RouteBuilder, { ApiResource } from './RouteBuilder';

//   auth: AuthState,
const getAllAuditEvents = async ():Promise<ApiResponse<{ audit: AuditEvent[] }> | null> => {
  try {
    const routeBuilder = new RouteBuilder().append(ApiResource.AUDIT_EVENT);
    const queryResponse = await axios.get(
      routeBuilder.build(),
    //   {
    //     headers: {
    //       Authorization: `Bearer ${auth.token}`,
    //     },
    //   },
    );
    console.log(queryResponse.data);
    return queryResponse.data;
  } catch (e) {
    return null;
  }
};

export default getAllAuditEvents;
