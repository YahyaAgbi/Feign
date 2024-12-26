package exemple.eurekafeignclient.service;

import exemple.eurekafeignclient.entities.Client;
import exemple.eurekafeignclient.entities.Voiture;
import exemple.eurekafeignclient.repository.VoitureRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class VoitureService {

    private final VoitureRepository voitureRepository;
    private final ClientService clientService;

    public VoitureService(VoitureRepository voitureRepository, ClientService clientService) {
        this.voitureRepository = voitureRepository;
        this.clientService = clientService;
    }

    public List<Voiture> findAll(){
        return voitureRepository.findAll();
    }

    public Optional<Voiture> findById(Long id){
        return voitureRepository.findById(id);
    }

    public Voiture save(Voiture voiture){
        return voitureRepository.save(voiture);
    }

    public void deleteById(Long id){
        voitureRepository.deleteById(id);
    }

    public Voiture update(Long id,Voiture voiture){
        Optional<Voiture> voitureOptional = voitureRepository.findById(id);
        if(voitureOptional.isPresent()){
            Voiture voitureToUpdate = voitureOptional.get();
            voitureToUpdate.setMarque(voiture.getMarque());
            voitureToUpdate.setModel(voiture.getModel());
            voitureToUpdate.setMatricule(voiture.getMatricule());
            voitureToUpdate.setId_client(voiture.getId_client());
            voitureToUpdate.setClient(voiture.getClient());
            return voitureRepository.save(voitureToUpdate);
        }
        return null;
    }

}
