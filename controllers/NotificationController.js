module.exports = class NotificationController {
  
  // Pegar notificações do usuário
  static async getUserNotifications(req, res) {
    const userId = req.user.id; // ID do usuário logado

    try {
      const notifications = await Notification.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).send({ notifications });
    } catch (error) {
      console.error("Erro ao obter notificações: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }

  // Marcar notificação como lida
  static async markAsRead(req, res) {
    const notificationId = req.params.notificationId;

    try {
      const notification = await Notification.findByPk(notificationId);
      if (!notification)
        return res.status(404).send("Notificação não encontrada.");

      notification.read = true;
      await notification.save();

      return res
        .status(200)
        .send({ message: "Notificação marcada como lida." });
    } catch (error) {
      console.error("Erro ao marcar notificação como lida: ", error);
      return res.status(500).send("Erro interno do servidor");
    }
  }
};
