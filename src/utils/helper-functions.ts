const getPartnerInfo = (participants: any, email: string) => {
  return participants.find((participant: any) => participant.email !== email);
};

export default getPartnerInfo;
